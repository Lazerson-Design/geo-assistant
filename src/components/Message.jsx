// src/components/Message.jsx
const Message = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* Avatar für den User-Nachricht auskommentieren */}
      {/* {!isUser && (
        <img
          className="w-8 h-8 rounded-full mr-2"
          src="https://via.placeholder.com/32"
          alt="User Avatar"
        />
      )} */}

      <div
        className={`max-w-[320px] p-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white rounded-r-lg"
            : "bg-gray-200 text-gray-700 rounded-l-lg"
        }`}
      >
        <p className="text-sm">{text}</p>
        {/* Zeitstempel auskommentieren */}
        {/* <span className="text-xs text-gray-500 block mt-1">
          {isUser ? "You" : "Admin Bot"} • 11:46
        </span> */}
      </div>

      {/* Avatar für den Bot-Nachricht auskommentieren */}
      {/* {isUser && (
        <img
          className="w-8 h-8 rounded-full ml-2"
          src="https://via.placeholder.com/32"
          alt="Bot Avatar"
        />
      )} */}
    </div>
  );
};

export default Message;
