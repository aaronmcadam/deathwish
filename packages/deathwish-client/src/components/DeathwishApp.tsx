import { Button, Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import {
  BrowserRouter,
  Link as ReactRouterLink,
  Route
} from 'react-router-dom';
import { useSignOut } from '../graphql/useSignOut';
import { ButtonLink } from './common/ButtonLink';
import { CreateDeathwishPage } from './pages/CreateDeathwishPage';
import { DeathwishListPage } from './pages/DeathwishListPage';
import { EditDeathwishPage } from './pages/EditDeathwishPage';
import { HomePage } from './pages/HomePage';
import { ProtectedPage } from './common/ProtectedPage';

export const DeathwishApp: React.FC = () => {
  const signOut = useSignOut();

  return (
    <Stack data-testid="app-pane" align="center">
      <ProtectedPage>
        <Stack py={4} width="containers.screen-lg">
          <BrowserRouter>
            <Stack isInline={true} justify="space-between" align="center">
              <ReactRouterLink to="/">
                <Heading as="h1" fontWeight="semibold">
                  DeathWish
                </Heading>
              </ReactRouterLink>
              <Stack isInline={true} spacing={4}>
                <ButtonLink
                  to="/deathwishes"
                  rightIcon="chevron-right"
                  variant="outline"
                  variantColor="blue"
                >
                  Your deathwishes
                </ButtonLink>
                <Button
                  data-testid="sign-out-button"
                  onClick={() => signOut()}
                  variant="link"
                  variantColor="black"
                  size="sm"
                >
                  Sign out
                </Button>
              </Stack>
            </Stack>
            <Route path="/" exact component={HomePage} />
            <Route path="/create" component={CreateDeathwishPage} />
            <Route path="/edit/:id" component={EditDeathwishPage} />
            <Route path="/deathwishes" component={DeathwishListPage} />
          </BrowserRouter>
        </Stack>
      </ProtectedPage>
    </Stack>
  );
};
