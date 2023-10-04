/* eslint-disable react-hooks/rules-of-hooks */
import {
  Card,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { ImplementGrid } from '~/layouts/Grid';
import { Informations } from '~/modules/configuration/components/informations/information';
import Locations from '~/modules/configuration/components/location/Locations';
import createLocation, {
  createMessage,
  createStoreInformation,
  deleteLocation,
  deleteMessage,
  getAllDataLocation,
  getMessages,
  getStoreid,
  updateMessage,
  updateStoreInformation,
} from '~/modules/configuration/configuration.service';

import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from '~/modules/configuration/components/CrudModal';

import { useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';
import Scroll from '~/modules/configuration/components/Scroll';
import {
  createMessageSchema,
  updateMessageSchema,
} from '~/modules/configuration/configuration.schema';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');

  const userId = getUserId(request);

  const user = await db.user.findFirst({
    where: {
      id: String(userId),
    },
    include: {
      store: true,
    },
  });

  const getLocationDataPromise = getAllDataLocation();
  const messagesPromise = getMessages(user?.storeId);
  const storeIdPromise = getStoreid(user?.storeId);

  const [getLocationData, messages, store_id] = await Promise.all([
    getLocationDataPromise,
    messagesPromise,
    storeIdPromise,
  ]);

  return { messages, store_id, getLocationData };
}

export async function action({ request }: ActionArgs) {
  //ini adalah action location ===============================================
  const formData = await request.formData();
  console.log('ini isi dari formData', formData);

  const actionType = formData.get('actionType');
  console.log('ini isi dari actionType', actionType);

  const name = formData.get('name');
  const address = formData.get('address');
  const latitude = formData.get('latitude');
  const longtitude = formData.get('longtitude');
  const cityDistrict = formData.get('cityDistrict');
  const postalCode = formData.get('postalCode');
  const isMainLocation = true;
  console.log('ini isi dari name :', name);
  console.log('ini isi dari adres :', address);
  console.log('ini isi dari lat :', latitude);
  console.log('ini isi dari long :', longtitude);
  console.log('ini isi dari city :', cityDistrict);
  console.log('ini isi dari poscode :', postalCode);
  console.log('ini isi dari isman :', isMainLocation);

  //ini action rifki===========================
  const nameStore = formData.get('namestore');
  const slogan = formData.get('slogan');
  const description = formData.get('description');
  const domain = `lakoe.store/${name}`;
  const logoAttachment = formData.get('logoAttachment');

  if (actionType === 'createlocation') {
    console.log('data berhasil masuk!');

    await createLocation({
      name,
      address,
      latitude,
      longtitude,
      cityDistrict,
      postalCode,
      isMainLocation,
    });
    const redirectURL = `/configuration/storeConfiguration/1 `;

    return redirect(redirectURL);
  } else if (actionType === 'deletelocation') {
    const id = formData.get('id') as string;
    await deleteLocation(id);
  }

  //=======================================================================

  if (actionType === 'createinformation') {
    const storeId = '';
    if (storeId) {
      await updateStoreInformation(storeId, {
        storeId: storeId,
        name: nameStore,
        slogan,
        description,
        domain,
        logoAttachment,
      });
    } else {
      await createStoreInformation({
        name: nameStore,
        slogan,
        description,
        domain,
        logoAttachment,
      });
    }
    const redirectURL = `/configuration/storeConfiguration/1 `;
    return redirect(redirectURL);
  }

  //ini action template message ==================================================================

  const action = formData.get('action');

  if (action === 'create') {
    const name = formData.get('name') as string;
    const storeId = formData.get('storeId') as string;
    const content = formData.get('content') as string;

    const validatedData = createMessageSchema.parse({ name, storeId, content });

    await createMessage(validatedData);
  } else if (action === 'delete') {
    const id = formData.get('id') as string;
    await deleteMessage(id);
  } else if (action === 'update') {
    const id = formData.get('id') as string;
    const name = formData.get('updatedName') as string;
    const content = formData.get('updatedContent') as string;

    const validatedData = updateMessageSchema.parse({ id, name, content });

    await updateMessage(validatedData);
  }

  return null;
}

export default function StoreConfiguration() {
  const data = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex h={'105vh'} mt={5}>
        <Tabs bg={'white'} mt={5} w={'100%'} borderRadius={5}>
          <Text fontWeight={'bold'} fontSize={'16px'} my={4} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Informasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Lokasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Template Pesan
            </Tab>
          </TabList>

          <TabPanels>
            <Informations />

            <Locations />

            <TabPanel>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={'16px'}
              >
                <Text fontWeight={'bold'} fontSize={'16px'}>
                  Daftar Template Pesan
                </Text>
                <CreateButton storeId={data.store_id?.id} />
              </Flex>
              <Scroll>
                <Stack spacing="2">
                  {data.messages.map((data, id) => (
                    <Card
                      key={id}
                      borderRadius={'lg'}
                      p={3}
                      pb={2}
                      variant={'outline'}
                    >
                      <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={2}
                      >
                        <Text fontWeight={'bold'} fontSize={'14px'}>
                          {data.name}
                        </Text>
                        <Flex gap={3}>
                          <UpdateButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                          <DeleteButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                        </Flex>
                      </Flex>
                      <Text fontSize={'13px'}>
                        {data.content && (
                          <div
                            dangerouslySetInnerHTML={{ __html: data.content }}
                          />
                        )}
                      </Text>
                    </Card>
                  ))}
                </Stack>
              </Scroll>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
