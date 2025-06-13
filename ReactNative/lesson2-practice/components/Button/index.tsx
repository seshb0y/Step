import { Pressable, FlexAlignType, ColorValue, DimensionValue } from "react-native"
import React from 'react';

type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
type FlexDirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;

interface Props{
    paddingVert?: number,
    alignItems?: FlexAlignType,
    justifyContent?: JustifyContentType,
    backgroundColor?: ColorValue,
    borderRadius?: number,
    width?: DimensionValue,
    marginTop?: number,
    children?: React.ReactNode,
    padLeft?: number,
    flexDir?: FlexDirectionType,
    fullPadding?: number
}

const ButtonReusable = (props: Props) => {
    return(
        <Pressable
        style={{
          paddingVertical: props.paddingVert,
          alignItems: props.alignItems,
          justifyContent: props.justifyContent,
          backgroundColor: props.backgroundColor,
          borderRadius: props.borderRadius,
          width: props.width,
          marginTop: props.marginTop,
          paddingLeft: props.padLeft,
          flexDirection: props.flexDir,
          padding: props.fullPadding
        }}>
            {props.children}
      </Pressable>
    )
}

export default ButtonReusable