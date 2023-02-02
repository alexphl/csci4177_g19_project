import React, { useState, useEffect } from "react";
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CustomerCard(customer) {
    return (
        <Card spacing = {1}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {customer.content.username}
          </Typography>
          <Typography variant="h5" component="div">
            {customer.content.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {customer.content.email}
          </Typography>
          <Typography variant="body2">
            {customer.content.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Customer</Button>
        </CardActions>
      </Card>
      )
  }
  