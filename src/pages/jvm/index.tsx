import { ChangeEvent, useState } from "react";
import JVM from "./java-slang/src";
import OsInterface from "./java-slang/src/utils/OsInterface";
import styles from "./s.module.scss";
import DotsBg from "@/common/backgrounds/BackgroundDots";
import CodeBlock from "@/common/markdown/CodeBlock";
import { JNI } from "./java-slang/src/components/JNI";
import MemoryArea from "./java-slang/src/components/MemoryArea";
import BootstrapClassLoader from "./java-slang/src/components/ClassLoader/BootstrapClassLoader";
import { classFileToText } from "./java-slang/src/utils/Prettify/classfile";
import { ClassFile } from "./java-slang/src/types/ClassFile";

function App() {
  const [content, setContent] = useState("");
  const [asm, setAsm] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) {
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.addEventListener("loadend", event => {
      if (!reader.result || typeof reader.result == "string") {
        return;
      }
      setContent("test");

      const view = new DataView(reader.result);

      let msg = "";
      console.debug = (...data) => {
        const message = data.join(" ");
        msg += "\n" + message;
      };

      const os = new OsInterface({
        main: view,
      });
      const jvm = new JVM(os);
      try {
        jvm.runClass("main");
      } catch {
        console.log("jvm end");
      }

      const memory = new MemoryArea(new JNI());

      const bscl = new BootstrapClassLoader(memory, os);
      const cls = bscl.readClass(view) as ClassFile;
      setAsm(classFileToText(cls));
      setContent(msg);
    });
  };

  return (
    <div className={styles.root}>
      <DotsBg dotColour="#444" bgColour="#111" />
      <div className={styles.container}>
        <div>
          <h1 style={{ fontSize: "2.5rem" }}>Java Slang</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ width: "50%", height: "80vh", overflow: "scroll" }}>
            <input type="file" onChange={handleFileChange} />
            <CodeBlock>
              <pre className="language-java">{asm}</pre>
            </CodeBlock>
          </div>
          <div style={{ width: "50%", height: "80vh", overflow: "scroll" }}>
            <h2>Output</h2>
            <CodeBlock>
              <pre className="language-java">{content}</pre>
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
