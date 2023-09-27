
  
  // 이 파일을 import해서 사용하는데에는 실제로 사용하지는 않지만, 타입 선언을 위해 필요합니다.
  
  declare module 'react-best-gradient-color-picker' {
    export interface ColorPickerProps {
      value: string;
      onChange: (value: string) => void;
      // 다른 ColorPickerProps의 속성들을 필요에 따라 여기에 추가할 수 있습니다.
    }
    export function useColorPicker(
      initialValue: string,
      onChange: (value: string) => void
    ): {
      setSolid: () => void;
      setGradient: () => void;
      isGradient: boolean;
      // 다른 useColorPicker의 반환값들을 필요에 따라 여기에 추가할 수 있습니다.
    };
    export default function ColorPicker(props: ColorPickerProps): JSX.Element;
  }
  