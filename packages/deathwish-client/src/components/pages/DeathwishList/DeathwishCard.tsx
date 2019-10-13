import * as Chakra from '@chakra-ui/core';
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagIcon,
  TagLabel,
  Text
} from '@chakra-ui/core';
import { StackProps } from '@chakra-ui/core/dist/Stack';
import React from 'react';
import * as ReactRouter from 'react-router';
import {
  Deathwish,
  DeathwishesDocument,
  useCurrentUserQuery,
  useDeleteDeathwishMutation,
  User
} from '../../../types/graphql';
import { Illustration } from '../../common/TemplateList/Illustration';

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

export const DeathwishCard: React.FC<
  {
    deathwish: Deathwish;
  } & StackProps
> = ({ deathwish, ...styleProps }) => {
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
  const [deleteDeathwish, { loading: isDeleting }] = useDeleteDeathwishMutation(
    {
      variables: {
        input: {
          deathwish: {
            id: deathwish.id
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
    }
  );
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
              Don't delete deathwish
            </Button>
            <Button
              data-testid="confirm-delete-button"
              onClick={handleDeleteClick}
              isLoading={isDeleting}
              loadingText="Deleting deathwish..."
              variantColor="red"
            >
              Delete deathwish
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
          <Illustration type={deathwish.type} />
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
