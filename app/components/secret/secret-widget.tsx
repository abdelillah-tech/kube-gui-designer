interface ISecretWidget {
  secretRef: string;
}

const SecretWidget = ({ secretRef }: ISecretWidget) => (
  <div className="flex justify-between space-x-4 p-1 border rounded-md border-black">
    <div className="text-xs">secret</div>
    <div className="text-xs">{secretRef}</div>
  </div>
);

export default SecretWidget;
