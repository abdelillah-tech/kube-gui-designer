import { useContext, useState } from "react";
import yaml from "js-yaml";
import { KubeComponentsContext } from "../../contexts";
import { mapComponents } from "../../files-generation/components-mappers";
import { StandardButton } from "../shared/components";
import { ClipboardIcon, XMarkIcon } from "@heroicons/react/16/solid";

const ResultModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");

  const { components } = useContext(KubeComponentsContext);

  const showContents = () => {
    const yamlFormat = mapComponents(components)
      .map((component) => yaml.dump(component))
      .join("---\n");
    setContent(yamlFormat);
    setShowModal(true);
  };

  const copyToClipBoard = () => navigator.clipboard.writeText(content);

  return (
    <>
      <StandardButton text="generate" handler={() => showContents()} />

      {showModal && content && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-scree h-screen">
          <div className="flex flex-col p-2 w-1/2 h-2/3 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-1 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-800">Result</h3>
              <div>
                <ClipboardIcon
                  className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={copyToClipBoard}
                />
                <XMarkIcon
                  className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={() => setShowModal(false)}
                />
              </div>
            </div>
            <div className="grow overflow-y-auto">
              <pre>{content}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultModal;
