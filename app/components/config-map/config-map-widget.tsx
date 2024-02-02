interface IConfigMapWidget {
    configRef: string
}

const ConfigMapWidget = ({ configRef }: IConfigMapWidget) => (
  <div className="flex justify-between space-x-4 p-1 border rounded-md border-black">
    <div className="text-xs">configMap</div>
    <div className="text-xs">{configRef}</div>
  </div>
);

export default ConfigMapWidget;
