import { useState, useCallback } from "react"
import { toast } from "react-toastify"
import { ethers } from "ethers"
import { useAppKitAccount } from "@reown/appkit/react"
import useSignerOrProvider from "./UseSignerOrProvider"
import ABI from "../abis/SkillExchange.json"
import useContract from "./useContract"

const useListSkills = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { address, isConnected } = useAppKitAccount()
  const { signer } = useSignerOrProvider()

  const contract = useContract(true)
  // console.log({contract})

  const createListing = useCallback(
    async (skillName, description) => {
      if (!address || !isConnected) {
        toast.error("Please connect your wallet")
        return
      }

      if (!signer) {
        toast.error("Signer is not available")
        return
      }

      setLoading(true)
      setError(null)




      // const skillListingContractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE
      try {
        // const contract = new ethers.Contract(skillListingContractAddress, ABI, signer)
        // console.log({contract})

        const estimatedGas = await contract.createListing.estimateGas(
          skillName,
          description
        );


        const tx = await contract.createListing(skillName, description, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        }
        )

        const receipt = await tx.wait()

        if (receipt.status === 1) {
          toast.success("Skill listing created successfully!")
          return receipt.transactionHash
        } else {
          throw new Error("Transaction failed")
        }
      } catch (err) {
        console.error("Error creating skill listing:", err)
        toast.error(`Error: ${err.message || "An unknown error occurred."}`)
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [address, isConnected, signer, contract],
  )

  return { createListing, loading, error }
}

export default useListSkills

