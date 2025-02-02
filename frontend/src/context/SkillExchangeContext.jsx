import { createContext, useContext, useState } from "react"

const SkillExchangeContext = createContext()

export function SkillExchangeProvider({ children }) {
  const [listings, setListings] = useState([])
  const [requests, setRequests] = useState([])
  const [agreements, setAgreements] = useState([])
  const [disputes, setDisputes] = useState([])
  const [userReputation, setUserReputation] = useState({})

  const value = {
    listings,
    setListings,
    requests,
    setRequests,
    agreements,
    setAgreements,
    disputes,
    setDisputes,
    userReputation,
    setUserReputation,
  }

  return <SkillExchangeContext.Provider value={value}>{children}</SkillExchangeContext.Provider>
}

export function useSkillExchange() {
  return useContext(SkillExchangeContext)
}