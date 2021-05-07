import * as React from "react";
import Svg, { SvgProps, Circle, Path, G } from "react-native-svg";

interface GenericInfoIcon extends SvgProps {
  pathColor: string;
}

function InfoBlue({ pathColor, ...rest }: GenericInfoIcon) {
  return (
    <Svg viewBox="0 0 28.621 28.621" {...rest}>
      <Path
        fill={pathColor}
        d="M14.311 0c-6.904 0-12.5 5.596-12.5 12.5 0 4.723 2.618 8.828 6.48 10.955l-.147 5.166 5.898-3.635c.089.002.178.014.269.014 6.904 0 12.5-5.596 12.5-12.5S21.215 0 14.311 0zm1.592 19.784H12.7V9.474h3.203v10.31zM14.28 8.211c-1.013 0-1.687-.718-1.665-1.604-.021-.927.652-1.624 1.686-1.624 1.033 0 1.689.697 1.71 1.624-.001.886-.679 1.604-1.731 1.604z"
      />
    </Svg>
  );
}

export default InfoBlue;
