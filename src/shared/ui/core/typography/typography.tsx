import { StyleProp, TextStyle } from 'react-native';

import { styled } from '@shared/ui/theme';
import { TypographyVariants } from '@shared/ui/theme/types';

const TextVariant = styled.Text<{ $variant: TypographyVariants }>`
  font-family: ${({ theme, $variant }) =>
    theme.typography[$variant].fontFamily};
  font-size: ${({ theme, $variant }) => theme.typography[$variant].size};
  letter-spacing: ${({ theme, $variant }) =>
    theme.typography[$variant].letterSpacing};
  line-height: ${({ theme, $variant }) =>
    theme.typography[$variant].lineHeight};
  color: ${({ theme }) => theme.palette.text.primary};
`;

type Props = {
  children: string;
  variant?: TypographyVariants;
  style?: StyleProp<TextStyle>;
};

export const Typography = ({ variant = 'body20', style, children }: Props) => {
  return (
    <TextVariant $variant={variant} style={style}>
      {children}
    </TextVariant>
  );
};
