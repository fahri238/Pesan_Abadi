import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Buffer "mo:base/Buffer"; // PERBAIKAN: Mengimpor Buffer untuk data yang bisa diubah

actor {
  public type Message = {
    text: Text;
    author: Principal;
    timestamp: Time.Time;
  };

  // PERBAIKAN: Menggunakan Buffer yang tidak stabil untuk operasi sehari-hari.
  var messages: Buffer.Buffer<Message> = Buffer.Buffer(0);
  
  // PERBAIKAN: Menyimpan data di sini hanya selama proses upgrade.
  stable var stable_messages_for_upgrade: [Message] = [];

  // PERBAIKAN: Menambahkan system hook untuk menyimpan data sebelum upgrade.
  system func preupgrade() {
    stable_messages_for_upgrade := Buffer.toArray(messages);
  };

  // PERBAIKAN: Menambahkan system hook untuk memuat data setelah upgrade.
  system func postupgrade() {
    messages := Buffer.fromArray(stable_messages_for_upgrade);
  };

  public shared (msg) func submitMessage(text: Text): async () {
    if (text == "") {
      throw Error.reject("Pesan tidak boleh kosong.");
    };

    let authorPrincipal = msg.caller; 

    let newMessage : Message = {
      text = text;
      author = authorPrincipal;
      timestamp = Time.now();
    };

    // PERBAIKAN: Menggunakan .add() yang lebih efisien daripada konkatenasi.
    messages.add(newMessage);
  };

  public query func getAllMessages(): async [Message] {
    // PERBAIKAN: Mengonversi Buffer ke Array sebelum dikirim.
    return Buffer.toArray(messages);
  };

  public shared query (msg) func getMyMessages(): async [Message] {
    let currentUser = msg.caller;
    // Menggunakan Buffer lokal untuk efisiensi.
    let userMessages = Buffer.Buffer<Message>(0);
    for (message in messages.vals()) {
      if (Principal.equal(message.author, currentUser)) {
        userMessages.add(message);
      };
    };
    return Buffer.toArray(userMessages);
  };
}
