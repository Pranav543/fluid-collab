'use client';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Card
} from '@tremor/react';

function calculateFlow(inputNumber: string): string {
  const result = (Number(inputNumber) / 1e18) * (365 / 12) * 24 * 3600;
  return result.toFixed(2);
}

function transformStreamsData(streams: any[]) {
  console.log(streams);
  const transformedData = streams.map(
    (stream: {
      sender: { id: any };
      receiver: { id: any };
      currentFlowRate: string;
      token: { symbol: any };
    }) => ({
      sender: stream.sender.id,
      receiver: stream.receiver.id,
      currentTokenFlow: calculateFlow(stream.currentFlowRate),
      tokenSymbol: stream.token.symbol
    })
  );

  return transformedData;
}

export default function UsersTable({
  streamsReceiving,
  streamsSending
}: {
  streamsReceiving: any;
  streamsSending: any;
}) {
  const receiving = transformStreamsData(streamsReceiving.streams);
  const sending = transformStreamsData(streamsSending.streams);
  return (
    <>
      <Card className="mt-8">
        <Title>Your Subscribers</Title>
        <Text>These many lovely folks are supporting you</Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Sender</TableHeaderCell>
              <TableHeaderCell>Amount/month</TableHeaderCell>
              <TableHeaderCell>token</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {receiving.map((rc) => (
              <TableRow key={rc.sender}>
                <TableCell>{rc.sender}</TableCell>
                <TableCell>
                  <Text>{rc.currentTokenFlow}</Text>
                </TableCell>
                <TableCell>
                  <Text>{rc.tokenSymbol}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card className="mt-8">
        <Title>Your Subscription</Title>
        <Text>You are support these lovely folks!</Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Sender</TableHeaderCell>
              <TableHeaderCell>Amount/month</TableHeaderCell>
              <TableHeaderCell>token</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sending.map((sn) => (
              <TableRow key={sn.sender}>
                <TableCell>{sn.sender}</TableCell>
                <TableCell>
                  <Text>{sn.currentTokenFlow}</Text>
                </TableCell>
                <TableCell>
                  <Text>{sn.tokenSymbol}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
