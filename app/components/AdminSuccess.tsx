import {
  Box,
  Tab,
  TabList,
  Tabs,
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
} from '@chakra-ui/react';

import { Link } from '@remix-run/react';
import AdminSuccessPopup from './AdminSuccessPopup';

export default function AdminSuccess() {
  return (
    <>
      <Box
        width={'100%'}
        mr={'10px'}
        padding={'10px'}
        borderRadius={'15px'}
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
        mt={'10px'}
      >
        <Box>
          <Tabs defaultIndex={3}>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'20px'}>
                Daftar Penarikan Dana
              </Text>
            </Box>

            <Box>
              <Box
                display={'flex'}
                overflow={'scroll'}
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <TabList mx={5}>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/dashboardAdmin'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Semua</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminRequest'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Request</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminProcessing'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text>Processing</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={''}>
                        <Tab>
                          {/* NOTIFICATION ORDER  !*/}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text>Success</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminDeclined'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Declined</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>
          </Tabs>
        </Box>

        {/* Sort By */}
        <Flex gap={'10px'} margin={'15px'}>
          <Input placeholder="Urutkan" />
          <Input placeholder="Filter" />
        </Flex>

        {/* Table */}
        <Box mt={'20px'} display={'flex'} justifyContent={'center'}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID Withdraw</Th>
                  <Th>Nama Seller</Th>
                  <Th>Tanggal</Th>
                  <Th>Saldo Penarikan</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>21</Td>
                  <Td>Dumbways Store</Td>
                  <Td>5 Sept 2023 15:05</Td>
                  <Td>Rp. 550.000</Td>
                  <Td margin={'2px 0'}>
                    <Box>
                      <Text
                        bg={'teal'}
                        color={'white'}
                        borderRadius={'15px'}
                        padding={'5px 15px'}
                      >
                        Success
                      </Text>
                    </Box>
                  </Td>
                  <Td padding={0}>
                    <Text
                      color={'black'}
                      textAlign={'center'}
                      borderRadius={'15px'}
                      cursor={'pointer'}
                    >
                      <AdminSuccessPopup />
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
