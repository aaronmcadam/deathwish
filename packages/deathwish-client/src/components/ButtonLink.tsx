import { Button } from '@chakra-ui/core';
import { ButtonProps } from '@chakra-ui/core/dist/Button';
import * as React from 'react';
import {
  Link as ReactRouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

type ButtonLinkProps = ButtonProps & RouterLinkProps;

/**
 * This is to work around the `as` prop needing generics.
 * @see https://github.com/chakra-ui/chakra-ui/issues/148#issuecomment-540457308
 */
export const ButtonLink: React.FC<ButtonLinkProps> = React.forwardRef(
  (props: ButtonLinkProps, ref: React.Ref<any>) => {
    return <Button ref={ref} as={ReactRouterLink} {...props} />;
  }
);
