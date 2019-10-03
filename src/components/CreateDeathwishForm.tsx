import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  Stack,
  Textarea
} from '@chakra-ui/core';
import * as React from 'react';
import { DeathwishType, useCreateDeathwishMutation } from '../types/graphql';

export const CreateDeathwishForm: React.FC = () => {
  const [type, setType] = React.useState(DeathwishType.Money);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cost, setCost] = React.useState(0);
  const [recipients, setRecipients] = React.useState('');
  const [createDeathWish] = useCreateDeathwishMutation({
    variables: {
      input: {
        deathwish: {
          type,
          title,
          description,
          cost,
          recipients
        }
      }
    }
  });

  function resetForm() {
    setType(DeathwishType.Money);
    setTitle('');
    setDescription('');
    setCost(0);
    setRecipients('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createDeathWish();

    resetForm();
  }

  return (
    <Stack
      data-testid="create-deathwish-form"
      as="form"
      onSubmit={handleSubmit}
      backgroundColor="white"
      padding={4}
      marginTop={4}
      spacing={4}
    >
      <Heading size="md">Create your deathwish!</Heading>
      <input
        data-testid="type-input"
        type="hidden"
        value={type}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setType(event.target.value as DeathwishType)
        }
      />
      <FormControl>
        <FormLabel htmlFor="title">Name your deathwish</FormLabel>
        <Input
          data-testid="title-input"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
          type="text"
          id="name"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Tell us your request</FormLabel>
        <Input
          data-testid="description-input"
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
            data-testid="cost-input"
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
          data-testid="recipients-input"
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
