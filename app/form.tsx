'use client';
import React, { useState } from 'react';
import { Text, TextInput, Button, Flex, NumberInput } from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface Tier {
  name: string;
  description: string;
  amount: string;
}

export default function UserForm({ users }: { users: User[] }) {
  const initialTier: Tier = { name: '', description: '', amount: '' };

  const [bio, setBio] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [tiers, setTiers] = useState<Tier[]>([initialTier]);

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handleAccountAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountAddress(event.target.value);
  };

  const handleTierChange = (
    index: number,
    field: keyof Tier,
    value: string
  ) => {
    const updatedTiers = tiers.map((tier, i) => {
      if (i === index) {
        return { ...tier, [field]: value };
      }
      return tier;
    });
    setTiers(updatedTiers);
  };

  const addTier = () => {
    setTiers([...tiers, initialTier]);
  };

  const deleteTier = (index: number) => {
    const updatedTiers = tiers.filter((_, i) => i !== index);
    setTiers(updatedTiers);
  };

  const handleViewMoreClick = () => {
    // Implement the logic for viewing more here
  };

  return (
    <div>
      <div className="mb-6">
        <Text>Bio</Text>
        <TextInput
          type="text"
          placeholder="bio"
          value={bio}
          onChange={handleBioChange}
        />
      </div>
      <div className="mb-6">
        <Text>Account Address (Where the money will be streamed)</Text>
        <TextInput
          type="text"
          placeholder="address"
          value={accountAddress}
          onChange={handleAccountAddressChange}
        />
      </div>
      {tiers.map((tier, index) => (
        <div key={index} className="mb-6">
          <Flex justifyContent="between" alignItems="center">
            <Text>{`Tier ${index + 1}`}</Text>
            <Button
              size="xs"
              onClick={() => deleteTier(index)}
              color="red"
              variant="secondary"
            >
              Delete Tier
            </Button>
          </Flex>
          <div className="mt-2">
            <TextInput
              type="text"
              placeholder="Name"
              value={tier.name}
              onChange={(event) =>
                handleTierChange(index, 'name', event.target.value)
              }
            />
          </div>
          <div className="mt-2">
            <TextInput
              type="text"
              placeholder="Description"
              value={tier.description}
              onChange={(event) =>
                handleTierChange(index, 'description', event.target.value)
              }
            />
          </div>
          <div className="mt-2">
            <NumberInput
              placeholder="Amount..."
              icon={CurrencyDollarIcon}
              value={tier.amount}
              onChange={(event) =>
                handleTierChange(index, 'amount', event.target.value)
              }
              enableStepper={false}
            />
          </div>
        </div>
      ))}

      <Flex justifyContent="end" className="space-x-2 pt-4 mt-8">
        <Button size="xs" variant="secondary" onClick={addTier}>
          Add Tier
        </Button>
      </Flex>
      <Flex justifyContent="end" className="space-x-2 border-t pt-4 mt-8">
        <Button size="xs" variant="primary" onClick={handleViewMoreClick}>
          Create Checkout
        </Button>
      </Flex>
    </div>
  );
}
