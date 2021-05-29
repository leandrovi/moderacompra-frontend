import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function ErrorImage(props: SvgProps) {
  return (
    <Svg width={66} height={54} viewBox="0 0 66 54" fill="none" {...props}>
      <Path
        d="M11.001 30.713c-.098-7.488 7.02-9.607 10.59-9.73 2.645-3.008 6.408-7.677 15.888-6.896 8.374.69 11.781 7.43 12.438 10.714 2.34.123 6.897 1.872 6.404 7.882-.492 6.01-6.116 7.84-8.867 8.005H21.592C18.102 40.483 11.099 38.2 11 30.713z"
        stroke="#F8F8F8"
        strokeWidth={1.079}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path stroke="#fff" d="M.684 53.612l65-53" />
    </Svg>
  );
}

export default ErrorImage;
