
import { useContext } from 'react'
import { BittensorContext } from "../../context/BittensorProvider/BittensorProvider";

export const useBittensor = () => useContext(BittensorContext);