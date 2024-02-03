import { useContext, useState } from "react";
import yaml from "js-yaml";
import { KubeComponentsContext } from "../../contexts";
import { mapComponents } from "../../files-generation/components-mappers";

const example = {
  apiVersion: "v1",
  kind: "Secret",
  metadata: {
    name: "mongo-secret",
  },
  type: "Opaque",
  data: {
    "mongo-user": "bW9uZ291c2Vy",
    "mongo-password": "bW9uZ29wYXNzd29yZA==",
  },
};

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

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => showContents()}
      >
        generate
      </button>
      {showModal && (
        <div className="overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full border border-black">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Result</h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex justify-center items-center p-4">
                <pre>
                  <code data-lang="yaml">{content}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultModal;
