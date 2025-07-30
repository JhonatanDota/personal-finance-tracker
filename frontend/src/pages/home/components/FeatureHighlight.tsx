import { IconType } from "react-icons";

interface FeatureHighlightProps {
  icon: IconType;
  title: string;
  text: string;
}

export default function FeatureHighlight(props: FeatureHighlightProps) {
  const { icon: Icon, title, text } = props;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Icon className="w-16 h-16 md:w-20 md:h-20 fill-orange-400" />
      <p className="text-2xl md:text-3xl uppercase font-bold text-white">
        {title}
      </p>
      <p className="text-base md:text-xl font-semibold text-slate-300">
        {text}
      </p>
    </div>
  );
}
