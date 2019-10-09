import * as Chakra from '@chakra-ui/core';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Stack,
  Tag,
  TagIcon,
  TagLabel,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/core';
import { StackProps } from '@chakra-ui/core/dist/Stack';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Deathwish,
  useDeathwishesQuery,
  useDeleteDeathwishMutation
} from '../types/graphql';
import { illustrations } from './DeathwishCard';

const Layout: React.FC = ({ children }) => {
  return (
    <Box data-testid="deathwishes-pane" py={8}>
      <Stack isInline={true} justify="space-between" align="center">
        <Heading>Your deathwishes</Heading>
        <Button as={ReactRouterLink} to="/" variantColor="pink">
          Create a deathwish
        </Button>
      </Stack>
      {children}
    </Box>
  );
};

const BlankSlate: React.FC = () => {
  return (
    <Alert
      status="info"
      variant="top-accent"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      py={4}
      mx={64}
      marginTop={16}
    >
      <AlertIcon size="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        You have no deathwishes
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Text>You haven't created any deathwishes yet!</Text>
        <Button as={ReactRouterLink} to="/" marginTop={4}>
          Create one now!
        </Button>
      </AlertDescription>
    </Alert>
  );
};

const CreateSuccessMessage: React.FC = () => {
  return (
    <Alert status="success" variant="subtle" marginTop={4}>
      <AlertIcon />
      You successfully created a new deathwish!
    </Alert>
  );
};

const UpdateSuccessMessage: React.FC = () => {
  return (
    <Alert status="success" variant="subtle" marginTop={4}>
      <AlertIcon />
      You successfully updated your deathwish!
    </Alert>
  );
};

const Recipients: React.FC<{ recipients: Deathwish['recipients'] }> = ({
  recipients
}) => {
  const recipientList = recipients.split(',');

  return (
    <Stack>
      {recipientList.map(recipient => (
        <Tag key={recipient}>
          <TagIcon icon="email" size={4} />
          <TagLabel>{recipient}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};

function createStatus(state?: { newDeathwishWasAdded?: boolean }) {
  if (!state) {
    return false;
  }

  return state.newDeathwishWasAdded;
}

function editStatus(state?: { deathwishWasUpdated?: boolean }) {
  if (!state) {
    return false;
  }

  return state.deathwishWasUpdated;
}

const DetailedDeathwishCard: React.FC<
  { deathwish: Deathwish } & StackProps
> = ({ deathwish, ...styleProps }) => {
  const [deleteDeathwish] = useDeleteDeathwishMutation({
    variables: {
      input: {
        deathwish: {
          id: deathwish.id
        }
      }
    }
  });
  const history = ReactRouter.useHistory();
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  function showEditForm() {
    history.push(`/edit/${deathwish.id}`);
  }

  async function handleDeleteClick() {
    await deleteDeathwish();

    if (onClose) {
      onClose();
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This action can't be undone!</Text>
          </ModalBody>
          <ModalFooter backgroundColor="gray.200">
            <Button
              data-testid="cancel-delete-button"
              variant="outline"
              variantColor="blue"
              mr={2}
              onClick={onClose}
            >
              Don't delete
            </Button>
            <Button
              data-testid="confirm-delete-button"
              onClick={handleDeleteClick}
              variantColor="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack
        key={deathwish.id}
        data-testid="current-deathwish"
        boxShadow="md"
        backgroundColor="white"
        width={300}
        spacing={0}
        marginTop={8}
        {...styleProps}
      >
        <Stack isInline={true} justify="center" align="center" height={300}>
          <Box as={illustrations[deathwish.type]} size={300} padding={4} />
        </Stack>
        <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
          <Heading size="md">{deathwish.title}</Heading>
          <Text color="gray.600">{deathwish.description}</Text>
          <Text fontWeight="bold">£{deathwish.cost}</Text>
          <Recipients recipients={deathwish.recipients} />
        </Stack>
        <Stack
          isInline={true}
          backgroundColor="gray.200"
          justify="flex-end"
          align="center"
          padding={2}
          marginTop="auto"
        >
          <Button
            data-testid="delete-deathwish-button"
            onClick={onOpen}
            variant="link"
            variantColor="black"
            size="sm"
          >
            Delete
          </Button>
          <Button
            data-testid="edit-deathwish-button"
            onClick={showEditForm}
            variant="outline"
            variantColor="blue"
            size="sm"
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export const Deathwishes: React.FC = () => {
  const location = ReactRouter.useLocation<{
    newDeathwishWasAdded?: boolean;
    deathwishWasUpdated?: boolean;
  }>();
  const newDeathwishWasAdded = createStatus(location.state);
  const deathwishWasUpdated = editStatus(location.state);
  const { data } = useDeathwishesQuery();

  if (!data) {
    return null;
  }

  if (!data.deathwishes) {
    return null;
  }

  const { deathwishes } = data;

  if (deathwishes.length === 0) {
    return (
      <Layout>
        <BlankSlate />
      </Layout>
    );
  }

  return (
    <Layout>
      {newDeathwishWasAdded && <CreateSuccessMessage />}
      {deathwishWasUpdated && <UpdateSuccessMessage />}
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Here are the deathwishes you've created so far...
      </Heading>
      <Stack isInline={true} flexWrap="wrap" spacing={4}>
        {deathwishes.map(deathwish => (
          <DetailedDeathwishCard key={deathwish.id} deathwish={deathwish} />
        ))}
      </Stack>
    </Layout>
  );
};
