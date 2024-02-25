import { useEffect, useRef, useState } from "react";
import "./App.css";
import Iframe from "./Iframe";
import Loader from "./Loader";
import { samplePrompts } from "./const";

function App() {
  const [prompts, setPrompts] = useState(samplePrompts || []);
  const [userText, setUserText] = useState("");
  const [source, setSource] = useState("");
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);

  const fetchData = async (first) => {
    if (!first) setIframeLoading(true);
    try {
      const response = await fetch("");
      if (response.ok) {
        const data = await response.json();
        setSource(data);
      } else {
        throw new Error("Failed to fetch data");
      }
      setIframeLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIframeLoading(false);
      throw new Error(`Failed to fetch data: ${error}`);
    }
  };

  const handleSubmitPrompt = (event) => {
    event.preventDefault();
    setPrompts((prev) => [
      ...prev,
      { id: prompts?.length + 1, message: userText },
    ]);
    setUserText("");
    setTimeout(() => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
    }, 0);
    fetchData();
  };

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
  }, [chatContainerRef.current, source]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setTimeout(async () => {
        // fetchData(true);
        setSource("src/b.html");
        setLoading(false);
      }, 2000);
    })();
  }, []);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <div className="main">
        <div className="left">
          <div className="chat-container">
            <div className="chat-container-inner" ref={chatContainerRef}>
              {prompts.map((prompt, idx) => {
                const isLastPrompt = idx === prompts?.length - 1;
                const refProp = isLastPrompt ? { ref: chatContainerRef } : {};
                return (
                  <div className="prompt-message" key={prompt.id}>
                    {prompt.message}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="prompt-composer">
            <form onSubmit={handleSubmitPrompt}>
              <input
                className="prompt-composer-input"
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Message Prompt"
              />
            </form>
          </div>
        </div>
        <div className="right">
          <Iframe
            source={source}
            iframeLoading={iframeLoading}
            setIframeLoading={setIframeLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
