import { Button, Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import {
  BrowserRouter,
  Link as ReactRouterLink,
  Route
} from 'react-router-dom';
import { useSignOut } from '../graphql/useSignOut';
import { Deathwish, DeathwishType } from '../types/graphql';
import { ButtonLink } from './ButtonLink';
import { ChooseTemplate } from './ChooseTemplate';
import { CreateDeathwishForm } from './CreateDeathwishForm';
import { Deathwishes } from './Deathwishes';
import { EditDeathwishPane } from './EditDeathwishPane';
import { ProtectedPage } from './ProtectedPage';

export interface DeathwishTemplate {
  type: DeathwishType;
  title: Deathwish['title'];
  description: Deathwish['description'];
}

const HomePage: React.FC<{
  setTemplate: React.Dispatch<React.SetStateAction<DeathwishTemplate | null>>;
}> = ({ setTemplate }) => {
  return (
    <>
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={2}
        textAlign="center"
      >
        What do you want to happen when you die?
      </Heading>
      <ChooseTemplate setTemplate={setTemplate} />
    </>
  );
};

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
            <Route path="/create" component={CreateDeathwishForm} />
            <Route path="/edit/:id" component={EditDeathwishPane} />
            <Route path="/deathwishes" component={Deathwishes} />
          </BrowserRouter>
        </Stack>
      </ProtectedPage>
    </Stack>
  );
};
