// import { useState, useEffect, useCallback } from "react"
// import { PlusCircle } from "lucide-react"
// import { ethers } from "ethers"
// import { toast } from "react-toastify"
// import Badge from "../components/ui/Badge"
// import Card from "../components/ui/Card"
// import Button from "../components/ui/Button"
// import useListSkill from "../hooks/UseListSkills"
// import useSignerOrProvider from "../hooks/UseSignerOrProvider"
// import ABI from "../abis/SkillExchange.json"

// const Listings = () => {
//   const [listings, setListings] = useState([])
//   const [showModal, setShowModal] = useState(false)
//   const { createListing, loading, error } = useListSkill()
//   const { provider, signer } = useSignerOrProvider()

//   const [newListing, setNewListing] = useState({
//     title: "",
//     skill: "",
//     description: "",
//   })

//   const fetchListings = useCallback(async () => {
//     if (!provider) {
//       console.log("Provider not available yet")
//       return
//     }

//     const skillListingContractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE
//     try {
//       const contract = new ethers.Contract(skillListingContractAddress, ABI, provider)
//       const listingCount = await contract.listingCounter()
//       const fetchedListings = []

//       for (let i = 0; i < listingCount; i++) {
//         const listing = await contract.listings(i)
//         fetchedListings.push({
//           id: listing.id.toString(),
//           title: listing.skillName,
//           creator: listing.userAddress,
//           skill: listing.skillName,
//           description: listing.description,
//           status: listing.isAvailable ? "Available" : "Sold",
//         })
//       }

//       setListings(fetchedListings)
//     } catch (err) {
//       console.error("Error fetching listings:", err)
//       toast.error("Failed to fetch listings")
//     }
//   }, [provider])

//   useEffect(() => {
//     if (provider) {
//       fetchListings()
//     }
//   }, [provider, fetchListings])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setNewListing((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!signer) {
//       toast.error("Please connect your wallet")
//       return
//     }
//     try {
//       await createListing(newListing.title, newListing.description)
//       setShowModal(false)
//       setNewListing({ title: "", skill: "", description: "" })
//       fetchListings() // Refresh the listings
//     } catch (err) {
//       console.error("Error creating listing:", err)
//       toast.error("Failed to create listing")
//     }
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold">Listings</h2>
//         <Button onClick={() => setShowModal(true)}>
//           <PlusCircle className="w-4 h-4 mr-2" />
//           Create New Listing
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
//         {listings.map((listing) => (
//           <ListingCard key={listing.id} listing={listing} />
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Listing</h3>
//               <form onSubmit={handleSubmit} className="mt-2 px-7 py-3">
//                 <input
//                   type="text"
//                   name="title"
//                   value={newListing.title}
//                   onChange={handleInputChange}
//                   placeholder="Title"
//                   className="mb-3 px-3 py-2 border rounded w-full"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="skill"
//                   value={newListing.skill}
//                   onChange={handleInputChange}
//                   placeholder="Skill Required"
//                   className="mb-3 px-3 py-2 border rounded w-full"
//                   required
//                 />
//                 <textarea
//                   name="description"
//                   value={newListing.description}
//                   onChange={handleInputChange}
//                   placeholder="Description"
//                   className="mb-3 px-3 py-2 border rounded w-full text-color:red"
//                   required
//                 ></textarea>
//                 <div className="items-center px-4 py-3">
//                   <Button type="submit" className="w-full" disabled={loading || !signer}>
//                     {loading ? "Creating..." : "Submit Listing"}
//                   </Button>
//                 </div>
//               </form>
//               {error && <p className="text-red-500 mt-2">{error}</p>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// const ListingCard = ({ listing }) => {
//   const statusColors = {
//     Available: "green",
//     Sold: "gray",
//   }

//   return (
//     <Card className="p-4 border rounded-md shadow-md">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold">{listing.title}</h3>
//           <p className="text-gray-600">Listing #{listing.id}</p>
//         </div>
//         <Badge color={statusColors[listing.status]}>{listing.status}</Badge>
//       </div>
//       <div className="grid grid-cols-1 gap-4 mb-4">
//         <div>
//           <p className="text-sm text-gray-500">Creator</p>
//           <p className="font-semibold">{listing.creator}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Skill Required</p>
//           <p className="font-semibold">{listing.skill}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Description</p>
//           <p className="font-semibold">{listing.description}</p>
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <Button variant="secondary">View Details</Button>
//       </div>
//     </Card>
//   )
// }

// export default Listings


import { useState, useEffect, useCallback } from "react"
import { PlusCircle } from "lucide-react"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import Badge from "../components/ui/Badge"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import useListSkill from "../hooks/UseListSkills"
import useSignerOrProvider from "../hooks/UseSignerOrProvider"
import ABI from "../abis/SkillExchange.json"

const Listings = () => {
  const [listings, setListings] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { createListing, loading, error } = useListSkill()
  const { provider, signer } = useSignerOrProvider()

  const [newListing, setNewListing] = useState({
    title: "",
    skill: "",
    description: "",
  })

  const fetchListings = useCallback(async () => {
    if (!provider) {
      console.log("Provider not available yet")
      return
    }

    const skillListingContractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE
    try {
      const contract = new ethers.Contract(skillListingContractAddress, ABI, provider)
      const listingCount = await contract.listingCounter()
      const fetchedListings = []

      for (let i = 0; i < listingCount; i++) {
        const listing = await contract.listings(i)
        fetchedListings.push({
          id: listing.id.toString(),
          title: listing.skillName,
          creator: listing.userAddress,
          skill: listing.skillName,
          description: listing.description,
          status: listing.isAvailable ? "Available" : "Sold",
        })
      }

      setListings(fetchedListings)
    } catch (err) {
      console.error("Error fetching listings:", err)
      toast.error("Failed to fetch listings")
    }
  }, [provider])

  useEffect(() => {
    if (provider) {
      fetchListings()
    }
  }, [provider, fetchListings])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewListing((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!signer) {
      toast.error("Please connect your wallet")
      return
    }
    try {
      await createListing(newListing.title, newListing.description)
      setShowModal(false)
      setNewListing({ title: "", skill: "", description: "" })
      fetchListings()
    } catch (err) {
      console.error("Error creating listing:", err)
      toast.error("Failed to create listing")
    }
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Listings</h2>
          <Button 
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md mx-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Listing</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={newListing.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="skill"
                      value={newListing.skill}
                      onChange={handleInputChange}
                      placeholder="Skill Required"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      value={newListing.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || !signer}
                    >
                      {loading ? "Creating..." : "Submit Listing"}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ListingCard = ({ listing }) => {
  const statusColors = {
    Available: "green",
    Sold: "gray",
  }

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{listing.title}</h3>
            <p className="text-sm text-gray-600">Listing #{listing.id}</p>
          </div>
          <Badge color={statusColors[listing.status]} className="ml-2 flex-shrink-0">
            {listing.status}
          </Badge>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm text-gray-500">Creator</p>
            <p className="text-sm font-medium truncate">{listing.creator}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Skill Required</p>
            <p className="text-sm font-medium">{listing.skill}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-sm font-medium line-clamp-3">{listing.description}</p>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button variant="secondary" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Listings

