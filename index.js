const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    jidDecode
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { smsg } = require("./CompanyInc/CmpyInc");
const readline = require("readline");

 // Bot base de WhatsApp cr: RilzX7 Inc. \\
      //  CompanyInc ©Copyright  \\
       // Thx For Using this base \\

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    if (!sock.authState.creds.registered) {
        const phoneNumber = await question('enter your number:\n');
        const code = await sock.requestPairingCode(phoneNumber, "AAAAAAAA");
        console.log(`code: ${code}`);
    }

    store.bind(sock.ev);

    sock.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            const m = smsg(sock, mek, store);
            require("./Inc")(sock, m, chatUpdate, store);
        } catch (err) {
            console.log(err);
        }
    });
    
    sock.public = true;

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                startBot();
            } else {
                console.log("Koneksi terputus....");
            }
        } else if (connection === "open") {
           sock.newsletterFollow('120363418090359162@newsletter')
            
        }
    });
    
    sock.ev.on("creds.update", saveCreds);

    sock.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    return sock;
}

startBot();


 // Bot base de WhatsApp cr: RilzX7 Inc. \\
      //  CompanyInc ©Copyright  \\
       // Thx For Using this base \\
