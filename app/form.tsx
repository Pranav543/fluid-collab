'use client';
import React, { useState } from 'react';
import { Text, Button, Flex, NumberInput } from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface User {
  tiers: Tier[];
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  accountAddress: string | null;
}

interface Tier {
  name: string;
  benefits: string[]; // Changed from 'description'
  amount: string;
}

export default function UserForm({ user, hasCheckout }: { user: User | null, hasCheckout: boolean }) {
  const initialTier: Tier = { name: '', benefits: [], amount: '' };

  const [bio, setBio] = useState(user && user.bio ? user.bio : '');
  const [accountAddress, setAccountAddress] = useState(user && user.accountAddress ? user.accountAddress : '');
  console.log("user: ", user)
  const initialTiers = user && user.tiers ? user.tiers : [initialTier];
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);

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
    value: string | string[]
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

  const handleBenefitKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const benefit = event.currentTarget.value.trim();
      if (benefit) {
        const updatedBenefits = [...tiers[index].benefits, benefit];
        handleTierChange(index, 'benefits', updatedBenefits);
        event.currentTarget.value = ''; // Clear the input
      }
    }
  };

  const handleRemoveBenefit = (index: number, benefitIndex: number) => {
    const updatedBenefits = tiers[index].benefits.filter(
      (_, i) => i !== benefitIndex
    );
    handleTierChange(index, 'benefits', updatedBenefits);
  };

  const handleSubmit = async () => {
    if (user) {
      try {
        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: user.id,
            bio: bio,
            accountAddress: accountAddress,
            hasCheckout: true,
            tiers: tiers
          })
        });

        if (response.ok) {
          const updatedUser = await response.json();
          // Handle any further actions or notifications here
        } else {
          console.error('Error updating user');
          // Handle error scenario here
        }
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error scenario here
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Text>Bio</Text>
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="bio"
          value={bio}
          onChange={handleBioChange}
        />
      </div>
      <div className="mb-6">
        <Text>Account Address (Where the money will be streamed)</Text>
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="address"
          value={accountAddress}
          onChange={handleAccountAddressChange}
        />
      </div>
      {tiers.map((tier, index) => (
        <div key={index} className="mb-4">
          <Flex justifyContent="between" alignItems="center" className="mb-4">
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
          <div className="mb-4">
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="Name"
              value={tier.name}
              onChange={(event) =>
                handleTierChange(index, 'name', event.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="Add Benefit and press Enter..."
              onKeyDown={(event) => handleBenefitKeyPress(event, index)}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tier.benefits.map((benefit, benefitIndex) => (
                <span
                  key={benefitIndex}
                  className="border border-gray-400 bg-gray-100 rounded p-1 px-2 flex items-center"
                >
                  {benefit}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveBenefit(index, benefitIndex)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
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

      <Flex justifyContent="end" className="space-x-2 pt-4 ">
        <Button
          size="xs"
          variant="secondary"
          onClick={addTier}
          disabled={tiers.length >= 3}
        >
          Add Tier
        </Button>
      </Flex>
      <Flex justifyContent="end" className="space-x-2 border-t pt-4 mt-8">
        <Button size="xs" variant="primary" onClick={handleSubmit}>
          {hasCheckout ? "Update Checkout" :"Create Checkout"}
        </Button>
      </Flex>
    </div>
  );
}
