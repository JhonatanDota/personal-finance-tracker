type TableRegistersProps = {
  loading: boolean;
  registerSingularName: string;
  registerPluralName: string;
  registersQuantity: number;
};

export default function TableRegisters(props: TableRegistersProps) {
  const {
    loading,
    registerSingularName,
    registerPluralName,
    registersQuantity,
  } = props;

  return (
    <span className="flex items-center text-primary-text text-sm">
      <span className={`${loading && "animate-pulse"}`}>
        Total de
        <span className="font-bold"> {registersQuantity} </span>
        {registersQuantity > 1 ? registerPluralName : registerSingularName}
      </span>
    </span>
  );
}
