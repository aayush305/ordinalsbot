import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Link,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Icon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Order } from "@/app/constants/types";

interface OrderProps {
  order: Order;
}

const OrderComponent: React.FC<OrderProps> = ({ order }) => {
  const getPaymentStatusIcon = () => {
    if (order.paid) {
      return <CheckCircleIcon color="success" />;
    } else if (order.underpaid) {
      return <HourglassEmptyIcon color="warning" />;
    } else if (order.expired) {
      return <CancelIcon color="error" />;
    } else {
      return <CancelIcon color="error" />;
    }
  };

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Order ID: {order.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {order.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          State: {order.state}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          {getPaymentStatusIcon()}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: 1 }}
          >
            Payment Status: {order.paid ? "Paid" : "Not Paid"}{" "}
            {order.underpaid && " (Underpaid)"} {order.expired && " (Expired)"}
          </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Amount Charged</TableCell>
                <TableCell>{order.charge.amount} BTC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Fee</TableCell>
                <TableCell>{order.fee} BTC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Base Fee</TableCell>
                <TableCell>{order.baseFee} BTC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chain Fee</TableCell>
                <TableCell>{order.chainFee} BTC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Service Fee</TableCell>
                <TableCell>{order.serviceFee} BTC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Order Type</TableCell>
                <TableCell>{order.orderType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Receive Address</TableCell>
                <TableCell>{order.receiveAddress}</TableCell>
              </TableRow>
              {order.charge.hosted_checkout_url && (
                <TableRow>
                  <TableCell>Checkout URL</TableCell>
                  <TableCell>
                    <Link
                      href={order.charge.hosted_checkout_url}
                      target="_blank"
                    >
                      View Checkout
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {order.tx && (
          <Box mt={2}>
            <Typography variant="h6">Transaction Data:</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Commit" secondary={order.tx.commit} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Fees" secondary={order.tx.fees} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Inscription"
                  secondary={order.tx.inscription}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Reveal" secondary={order.tx.reveal} />
              </ListItem>
            </List>
          </Box>
        )}
        {order.files && order.files.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Files:</Typography>
            <List>
              {order.files.map((file) => (
                <ListItem key={file.url}>
                  <Link href={file.url} target="_blank">
                    {file.name} ({file.size} bytes)
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {order.sent && (
          <Typography variant="body2" color="text.secondary">
            Sent: {order.sent}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderComponent;
