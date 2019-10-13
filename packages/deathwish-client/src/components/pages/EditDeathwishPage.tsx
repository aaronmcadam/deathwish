import {
  Button,
  FormControl,
  FormErrorMessage,
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
import * as ReactRouter from 'react-router-dom';
import {
  Deathwish,
  DeathwishesDocument,
  useCurrentUserQuery,
  useDeathwishQuery,
  User,
  useUpdateDeathwishMutation
} from '../../types/graphql';
import { Illustration } from '../common/TemplateList/Illustration';

function validate(fields: {
  title: string;
  description: string;
  recipients: string;
}): {
  title?: string;
  description?: string;
  recipients?: string;
} {
  let errors: {
    title?: string;
    description?: string;
    recipients?: string;
  } = {};
  if (!fields.title) {
    errors.title = 'Please tell us the name of the deathwish';
  }

  if (!fields.description) {
    errors.description = "Please describe what you'd like to happen";
  }

  if (!fields.recipients) {
    errors.recipients = 'Please tell us who will benefit from your deathwish';
  }

  return errors;
}

const EditDeathwishForm: React.FC<{ currentDeathwish: Deathwish }> = ({
  currentDeathwish
}) => {
  const history = ReactRouter.useHistory();
  const [title, setTitle] = React.useState(currentDeathwish.title);
  const [description, setDescription] = React.useState(
    currentDeathwish.description
  );
  const [cost, setCost] = React.useState(currentDeathwish.cost);
  const [recipients, setRecipients] = React.useState(
    currentDeathwish.recipients
  );
  const { data: currentUserPayload } = useCurrentUserQuery();
  const owner: User =
    currentUserPayload && currentUserPayload.me
      ? {
          id: currentUserPayload.me.id,
          email: currentUserPayload.me.email
        }
      : {
          id: 'guest',
          email: 'guest@example.com'
        };
  const [updateDeathwish] = useUpdateDeathwishMutation({
    variables: {
      input: {
        deathwish: {
          id: currentDeathwish.id,
          title,
          description,
          cost,
          recipients
        }
      }
    },
    refetchQueries: [
      {
        query: DeathwishesDocument,
        variables: {
          ownerEmail: owner.email
        }
      }
    ]
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{
    title?: string;
    description?: string;
    recipients?: string;
  }>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const formErrors = validate({
      title,
      description,
      recipients
    });

    if (Object.keys(formErrors).length) {
      setIsSubmitting(false);

      return setFormErrors(formErrors);
    }

    await updateDeathwish();

    setIsSubmitting(false);
    history.push('/deathwishes', {
      deathwishWasUpdated: true
    });
  }

  return (
    <Stack
      data-testid="edit-deathwish-form"
      as="form"
      onSubmit={handleSubmit}
      backgroundColor="white"
      padding={4}
      marginTop={4}
      spacing={4}
    >
      <Stack isInline={true} justify="center" align="center">
        <Illustration type={currentDeathwish.type} />
      </Stack>
      <FormControl isInvalid={!!formErrors.title}>
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
        <FormErrorMessage>{formErrors.title}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!formErrors.description}>
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
        <FormErrorMessage>{formErrors.description}</FormErrorMessage>
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
      <FormControl isInvalid={!!formErrors.recipients}>
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
        <FormErrorMessage>{formErrors.recipients}</FormErrorMessage>
        <FormHelperText id="recipients-helper-text">
          This can be a comma separated list of email addresses
        </FormHelperText>
      </FormControl>
      <Button
        isLoading={isSubmitting}
        loadingText="Updating deathwish..."
        type="submit"
        variantColor="pink"
      >
        Update deathwish
      </Button>
    </Stack>
  );
};

export const EditDeathwishPage: React.FC = () => {
  const { id } = ReactRouter.useParams<{ id: Deathwish['id'] }>();
  const { data } = useDeathwishQuery({
    variables: {
      id: id
    }
  });

  if (!data) {
    return null;
  }

  const { deathwish } = data;

  if (!deathwish) {
    return null;
  }

  return (
    <>
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Edit your deathwish!
      </Heading>
      <EditDeathwishForm currentDeathwish={deathwish} />
    </>
  );
};