import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

import colors from "../../styles/colors";

function GroceryIcon(props: SvgProps) {
  return (
    <Svg
      data-name="Out line"
      viewBox="0 0 512 512"
      width={512}
      height={512}
      fill={colors.orange}
      {...props}
    >
      <Path d="M496 184h-8V95.21a79.517 79.517 0 00-48.24-73.16 40.206 40.206 0 00-31.52 0A79.517 79.517 0 00360 95.21v75.6a87.544 87.544 0 01-15.64-42.82v-.008A7.994 7.994 0 00352 120V72a8 8 0 00-8-8h-64a8 8 0 00-8 8v2.85c-.44-.51-.9-1-1.38-1.48a31.984 31.984 0 00-50.61 7.14 32.22 32.22 0 00-5.39-7.14 32.003 32.003 0 00-53.81 15.44A31.988 31.988 0 00146.86 144a31.965 31.965 0 005.14 51.7V240h16v-40h240v280h-64v16h152a7.998 7.998 0 008-8V192a7.998 7.998 0 00-8-8zm-120-48h24a8 8 0 010 16h-24zm4.37-64H400a8 8 0 110 16h-23.6a64.012 64.012 0 013.97-16zM288 80h48v32h-48zM168 184a16 16 0 010-32 8 8 0 000-16 16 16 0 010-32 7.998 7.998 0 008-8 16 16 0 0131.62-3.47 31.958 31.958 0 00-4.76 51.47 31.937 31.937 0 00-6.56 40zm56 0a16 16 0 010-32 8 8 0 000-16 16 16 0 010-32 7.998 7.998 0 008-8 16 16 0 1132 0 7.998 7.998 0 008 8v16a7.994 7.994 0 007.64 7.982v.008A87.734 87.734 0 01256 180.62V96h-16v88zm50.14 0a103.386 103.386 0 0021.55-56h32.62a103.386 103.386 0 0021.55 56zM376 184v-16h24a24 24 0 000-48h-24v-16h24a24 24 0 000-48h-10.48a63.465 63.465 0 0125.03-19.24 24.042 24.042 0 0118.9 0A63.516 63.516 0 01472 95.21V184zm112 296h-64V200h64zM176 432a24.043 24.043 0 00-18.334-23.324 67.082 67.082 0 00-123.332 0 24.003 24.003 0 000 46.648 67.082 67.082 0 00123.332 0A24.043 24.043 0 00176 432zm-24 8a8 8 0 00-7.428 5.03l-1.144 2.86a51.082 51.082 0 01-94.856 0l-1.144-2.86A8 8 0 0040 440a8 8 0 010-16 8 8 0 007.428-5.03l1.144-2.86a51.082 51.082 0 0194.856 0l1.144 2.86A8 8 0 00152 424a8 8 0 010 16z" />
      <Path d="M64 408h16v16H64zM80 440h16v16H80zM112 424h16v16h-16zM206.02 341.85l17.14-34.27-14.32-7.16-11.03 22.07-5.81-5.81v-16.93a40.185 40.185 0 00-34.34-39.59l-28.53-4.08a7.994 7.994 0 00-9.05 9.05l4.08 28.53A40.185 40.185 0 00163.75 328h16.93l9.21 9.21a80.08 80.08 0 00-67.23 19.16l10.68 11.92A63.911 63.911 0 01176 352a62.442 62.442 0 016.87.37l-9.07 18.13a7.74 7.74 0 00-2.22-1.66l-16-8-7.16 14.32 13.85 6.92a25.955 25.955 0 0029.34 10.67l12.81 6.41 7.16-14.32-16-8a8.044 8.044 0 00-7.02-.07l10.28-20.55a64.007 64.007 0 01-44.17 120.14l-5.34 15.09a80.01 80.01 0 0056.69-149.6zM176 300.69l-15.6-15.6-11.31 11.31 15.6 15.6h-.94a24.127 24.127 0 01-23.76-20.61l-2.56-17.96 17.96 2.57A24.109 24.109 0 01176 299.75z" />
      <Path d="M304 272h-8v-8h8a7.998 7.998 0 008-8v-32a7.998 7.998 0 00-8-8h-80a7.998 7.998 0 00-8 8v32a7.998 7.998 0 008 8h8v8h-8a32.051 32.051 0 00-23.85 10.67l11.92 10.66A16.03 16.03 0 01224 288h16a7.998 7.998 0 008-8v-16h32v8h-16v16h40a16.021 16.021 0 0116 16v16h-88v16h88v96h-48v16h48v16a16.021 16.021 0 01-16 16h-64v16h64a32.036 32.036 0 0032-32V304a32.036 32.036 0 00-32-32zm-72-24v-16h64v16z" />
    </Svg>
  );
}

export default GroceryIcon;