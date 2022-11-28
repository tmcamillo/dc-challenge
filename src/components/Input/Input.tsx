export interface IInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  label: string;
  placeholder: string;
}

function Input(props: IInput): JSX.Element {
  const { id, value, label, placeholder, onChange } = props;

  return (
    <label
      className='flex flex-col content-start items-center gap-2 mb-10'
      htmlFor={id}
    >
      <span className='text-3xl font-bold my-10'>{label}</span>
      <input
        className='relative border-solid border-2 w-[60%] p-3 border-slate-200 rounded-md placeholder:italic placeholder:text-slate-400'
        type='search'
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
