import RoundedContainer from "../RoundedContainer";
import Typography from "../Typography";

interface ToggleButtonProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  textTrue: string;
  textFalse: string;
}
const ToggleButton = ({
  checked,
  setChecked,
  textTrue,
  textFalse,
}: ToggleButtonProps) => {
  return (
    <RoundedContainer className="cursor-pointer " borderWidth="">
      <label className="flex flex-col gap-2 items-center justify-center text-center">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div className="bg-lightSecondary relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>

        <Typography as="span" variant="span" className="font-bold">
          {checked ? textTrue : textFalse}
        </Typography>
      </label>
    </RoundedContainer>
  );
};

export default ToggleButton;
