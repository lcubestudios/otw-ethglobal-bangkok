import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LocationRecorded } from "../generated/schema"
import { LocationRecorded as LocationRecordedEvent } from "../generated/LogContract/LogContract"
import { handleLocationRecorded } from "../src/log-contract"
import { createLocationRecordedEvent } from "./log-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let latitude = BigInt.fromI32(234)
    let longitude = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let placeName = "Example string value"
    let country = "Example string value"
    let city = "Example string value"
    let zipCode = "Example string value"
    let newLocationRecordedEvent = createLocationRecordedEvent(
      user,
      latitude,
      longitude,
      timestamp,
      placeName,
      country,
      city,
      zipCode
    )
    handleLocationRecorded(newLocationRecordedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LocationRecorded created and stored", () => {
    assert.entityCount("LocationRecorded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "latitude",
      "234"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "longitude",
      "234"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "placeName",
      "Example string value"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "country",
      "Example string value"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "city",
      "Example string value"
    )
    assert.fieldEquals(
      "LocationRecorded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "zipCode",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
