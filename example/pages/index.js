import Head from 'next/head'
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import { BittensorContext } from '../src/context/BittensorProvider/BittensorProvider'
import { useContext, useState } from 'react'

import { Box, TextField, Grid, Button } from '@mui/material'




export default function Home() {
  const { api } = useContext(BittensorContext);

  // create a handler function for typing in the input and setting the state
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    console.log(api.genesisHash.toHex())
    setInput(event.target.value);
  };
  

  return (
    <>
    {/* create a search bar using MUI that is in the middle of the page */}
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      p={10}
    >
      <Grid item xs={12}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="10vh"
          width="100"
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={input}
            onChange={handleChange}
          />
          {/* Create a submit button for the textfield */}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
        >
            Search
        </Button>
      </Grid>
    </Grid>
    </>
  )
}
