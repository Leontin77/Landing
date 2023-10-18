/* Code generated with AutoHTML Plugin for Figma */
import "./Button.scss";

export interface IButtonProps {
    className?: string;
    onClick?: () => void;
}

export const Button = ({ ...props }: IButtonProps): JSX.Element => {
  return (
    <div {...props} className="button hover">
      <div className="button__kup-teraz">Купить сейчас!</div>
    </div>
  );
};
