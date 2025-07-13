import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
// Pastikan nama import 'backend' sesuai dengan canister Anda
import { idlFactory as backendIdl, canisterId as backendCanisterId } from 'declarations/backend';
import '/index.css';

// Konfigurasi untuk koneksi ke Internet Computer
const agent = new HttpAgent({
  host: process.env.DFX_NETWORK === "ic" ? "https://icp-api.io" : "http://127.0.0.1:4943",
});
const backend = Actor.createActor(backendIdl, { agent, canisterId: backendCanisterId });


const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authClient, setAuthClient] = useState(null);

  // Inisialisasi AuthClient saat komponen dimuat
  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);
      if (isAuth) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        setPrincipal(principal);
      }
      fetchMessages();
    });
  }, []);

  // Fungsi untuk mengambil semua pesan dari backend
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const fetchedMessages = await backend.getAllMessages();
      // Urutkan pesan dari yang terbaru
      fetchedMessages.sort((a, b) => Number(b.timestamp - a.timestamp));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Gagal mengambil pesan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk handle login
  const handleLogin = async () => {
    if (!authClient) return;
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        setIsAuthenticated(true);
        setPrincipal(principal);
      },
    });
  };

  // Fungsi untuk handle logout
  const handleLogout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  // Fungsi untuk mengirim pesan baru
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated) return;

    setIsLoading(true);
    try {
      await backend.submitMessage(newMessage);
      setNewMessage('');
      await fetchMessages(); // Ambil pesan terbaru setelah mengirim
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Gagal mengirim pesan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper untuk format waktu
  const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp / 1000000n)); // Konversi dari nanoseconds
    return date.toLocaleString();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <header className="flex items-center justify-between rounded-t-lg border-b p-4">
          <h1 className="text-2xl font-bold text-gray-800">Pesan Abadi</h1>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600 truncate max-w-xs">
                Logged in as: <code className="bg-gray-200 p-1 rounded">{principal?.toText()}</code>
              </p>
              <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Login dengan Internet Identity
            </button>
          )}
        </header>

        {/* Form Pengiriman Pesan */}
        {isAuthenticated && (
          <div className="border-b p-4">
            <form onSubmit={handleSubmitMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tulis pesan abadi Anda di sini..."
                className="flex-grow rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button type="submit" className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600 disabled:bg-green-300" disabled={isLoading}>
                {isLoading ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          </div>
        )}

        {/* Daftar Pesan */}
        <main className="p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Timeline Pesan</h2>
          {isLoading && messages.length === 0 ? (
            <p>Memuat pesan...</p>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="rounded-md border bg-gray-50 p-4 shadow-sm">
                  <p className="text-gray-800">{msg.text}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <p className="truncate max-w-xs">
                      Dari: <code className="bg-gray-200 p-1 rounded">{msg.author.toText()}</code>
                    </p>
                    <span>{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Belum ada pesan. Jadilah yang pertama!</p>
          )}
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
