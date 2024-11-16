import { LocationRecorded as LocationRecordedEvent } from "../generated/LogContract/LogContract"
import { LocationRecorded } from "../generated/schema"

export function handleLocationRecorded(event: LocationRecordedEvent): void {
  let entity = new LocationRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.latitude = event.params.latitude
  entity.longitude = event.params.longitude
  entity.timestamp = event.params.timestamp
  entity.placeName = event.params.placeName
  entity.country = event.params.country
  entity.city = event.params.city
  entity.zipCode = event.params.zipCode

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
