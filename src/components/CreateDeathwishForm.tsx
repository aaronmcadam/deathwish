import * as ApolloReactHooks from '@apollo/react-hooks';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  NumberInput,
  FormHelperText,
  Textarea,
  RadioGroup,
  Radio,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';

const CREATE_WISH = gql`
  mutation CreateDeathwish($input: CreateDeathwishInput!) {
    createDeathwish(input: $input) @client
  }
`;

export const CreateDeathwishForm: React.FC = () => {
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cost, setCost] = React.useState(0);
  const [recipients, setRecipients] = React.useState('');
  const [createWish] = ApolloReactHooks.useMutation(CREATE_WISH, {
    variables: {
      input: {
        type,
        name,
        description,
        cost,
        recipients
      }
    }
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createWish();
  }

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      backgroundColor="white"
      padding={4}
      marginTop={4}
      spacing={4}
    >
      <Heading size="md">Create your deathwish!</Heading>
      <FormControl as="fieldset">
        <FormLabel as="legend" htmlFor="type">
          Type
        </FormLabel>
        <RadioGroup
          value={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setType(event.target.value)
          }
          id="type"
        >
          <Radio value="money">Money</Radio>
          <Radio value="holiday">Holiday</Radio>
          <Radio value="video-message">Video Message</Radio>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Name your deathwish</FormLabel>
        <Input
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          type="text"
          id="text"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Tell us your request</FormLabel>
        <Input
          as={Textarea}
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
          id="description"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="cost">How much will it cost?</FormLabel>
        <InputGroup>
          <InputLeftAddon children="£" />
          <NumberInput
            value={cost}
            onChange={(value: any) => setCost(value)}
            min={0}
            step={1000}
            id="cost"
            aria-labelledby="cost"
            aria-describedby="cost-helper-text"
          />
        </InputGroup>
        <FormHelperText id="cost-helper-text">
          This is only a rough estimate
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="recipients">Who are the recipients?</FormLabel>
        <Input
          value={recipients}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRecipients(event.target.value)
          }
          type="text"
          id="recipients"
          aria-describedby="recipients-helper-text"
        />
        <FormHelperText id="recipients-helper-text">
          This can be a comma separated list of email addresses
        </FormHelperText>
      </FormControl>
      <Button type="submit" variantColor="pink">
        Create wish
      </Button>
    </Stack>
  );
};
