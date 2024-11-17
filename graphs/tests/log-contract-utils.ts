import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { LocationRecorded } from "../generated/LogContract/LogContract"

export function createLocationRecordedEvent(
  user: Address,
  latitude: BigInt,
  longitude: BigInt,
  timestamp: BigInt,
  placeName: string,
  country: string,
  city: string,
  zipCode: string
): LocationRecorded {
  let locationRecordedEvent = changetype<LocationRecorded>(newMockEvent())

  locationRecordedEvent.parameters = new Array()

  locationRecordedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "latitude",
      ethereum.Value.fromSignedBigInt(latitude)
    )
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "longitude",
      ethereum.Value.fromSignedBigInt(longitude)
    )
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam("placeName", ethereum.Value.fromString(placeName))
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam("city", ethereum.Value.fromString(city))
  )
  locationRecordedEvent.parameters.push(
    new ethereum.EventParam("zipCode", ethereum.Value.fromString(zipCode))
  )

  return locationRecordedEvent
}
