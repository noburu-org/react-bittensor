import Head from 'next/head'
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import { useState } from 'react'
import { useBittensor } from '../src/hooks/useBittensor'
import { Box, TextField, Grid, Button } from '@mui/material'

// 5DL9BytB9wkzDM8cq5tg3MC8Tsd2V24mKBKKiicCP5QrGqjr

export default function Home() {
  const { 
    api, 
    difficulty, 
    total_issuance, 
    total_stake, 
    n, 
    get_balance,
    create_coldkey,
    create_hotkey,
  } = useBittensor();
  // create a handler function for typing in the input and setting the state
  const [input, setInput] = useState('');
  // const { api, get_balance } = useBittensor();
  
  const handleChange = async (event) => {
    setInput(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    const b = await get_balance(api, input)

    const coldkey = await create_coldkey()
    console.log('tao balance', b.tao)


    console.log('difficulty', difficulty)
    console.log('total_issuance', total_issuance)
    console.log('total_stake', total_stake)
    console.log('n', n)

    console.log('mnemonic', coldkey.mnemonic)
    console.log('pair', coldkey.pair)


    event.preventDefault();
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
          onClick={handleSubmit}
        >
            Search
        </Button>
      </Grid>
    </Grid>
    </>
  )
}
