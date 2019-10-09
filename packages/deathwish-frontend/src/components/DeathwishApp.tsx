import { Button, Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import {
  BrowserRouter,
  Link as ReactRouterLink,
  Route
} from 'react-router-dom';
import { Deathwish, DeathwishType } from '../types/graphql';
import { ChooseTemplate } from './ChooseTemplate';
import { CreateDeathwishForm } from './CreateDeathwishForm';
import { EditDeathwishPane } from './EditDeathwishPane';
import { Deathwishes } from './Deathwishes';

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

interface As {
  as?: React.ElementType | ReactRouterLink;
}

export const DeathwishApp: React.FC = () => {
  return (
    <Stack data-testid="app-pane" align="center">
      <Stack py={4} width="containers.screen-lg">
        <BrowserRouter>
          <Stack isInline={true} justify="space-between" align="center">
            <ReactRouterLink to="/">
              <Heading as="h1" fontWeight="semibold">
                DeathWish
              </Heading>
            </ReactRouterLink>
            <Button
              as={ReactRouterLink}
              to="/deathwishes"
              rightIcon="chevron-right"
              variant="outline"
              variantColor="blue"
            >
              Your deathwishes
            </Button>
          </Stack>
          <Route path="/" exact component={HomePage} />
          <Route path="/create" component={CreateDeathwishForm} />
          <Route path="/edit/:id" component={EditDeathwishPane} />
          <Route path="/deathwishes" component={Deathwishes} />
        </BrowserRouter>
      </Stack>
    </Stack>
  );
};
