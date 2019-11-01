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
  DeathwishesDocument,
  useCreateDeathwishMutation,
  useCurrentUserQuery,
  User
} from '../../types/graphql';
import { Illustration } from '../common/TemplateList/Illustration';
import {
  DeathwishTemplate,
  templates
} from '../common/TemplateList/TemplateCard';
import { validateDeathwish } from './common/validateDeathwish';

const CreateDeathwishForm: React.FC = () => {
  const history = ReactRouter.useHistory();
  const {
    state: { type }
  } = ReactRouter.useLocation<{ type: DeathwishTemplate['type'] }>();
  const template = templates[type];
  const [title, setTitle] = React.useState(template.title);
  const [description, setDescription] = React.useState(template.description);
  const [cost, setCost] = React.useState(0);
  const [recipients, setRecipients] = React.useState('');
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
  const [createDeathWish] = useCreateDeathwishMutation({
    variables: {
      input: {
        deathwish: {
          type: template.type,
          title,
          description,
          cost,
          recipients,
          owner: owner
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

    const formErrors = validateDeathwish({
      title,
      description,
      recipients
    });

    if (Object.keys(formErrors).length) {
      setIsSubmitting(false);

      return setFormErrors(formErrors);
    }

    await createDeathWish();

    setIsSubmitting(false);
    history.push('/deathwishes', {
      newDeathwishWasAdded: true
    });
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
      <Stack isInline={true} justify="center" align="center">
        <Illustration type={type} />
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
        data-testid="create-deathwish-button"
        isLoading={isSubmitting}
        loadingText="Creating deathwish..."
        type="submit"
        variantColor="pink"
      >
        Create deathwish
      </Button>
    </Stack>
  );
};

export const CreateDeathwishPage: React.FC = () => {
  return (
    <>
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Create your deathwish!
      </Heading>
      <CreateDeathwishForm />
    </>
  );
};
