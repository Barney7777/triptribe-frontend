import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPanel from '../TabPanel';
import userEvent from '@testing-library/user-event';
import { UserRole } from '@/types/user';

jest.mock('../ReviewsCard', () => {
  const mockReviewCard = () => <div>this is reviews card</div>;
  return mockReviewCard;
});

describe('TabPanel Component', () => {
  const mockUser = {
    _id: '12345',
    email: 'linfei@123.com',
    nickname: 'linfei',
    userAvatar: {
      imageAlt: 'imageAlt',
      imageUrl: 'imageUrl',
      imageType: 'imageType',
      uploadUserId: 'uploadUserId',
      _id: '_id',
    },
    role: 'admin' as UserRole,
    savedAttractions: ['SavedAttractions'],
    savedRestaurants: ['SavedRestaurants'],
    createdAt: '1',
    updatedAt: '2',
    __v: 1,
  };

  it('renders all tabs', () => {
    render(
      <TabPanel
        user={mockUser}
        showPrivacyTabs={true}
      />
    );
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('renders public tabs only', () => {
    const securityTab = screen.queryByText('Security');
    render(
      <TabPanel
        user={mockUser}
        showPrivacyTabs={false}
      />
    );
    expect(securityTab).not.toBeInTheDocument();
  });

  it('changes to General card when tab is clicked', async () => {
    render(
      <TabPanel
        user={mockUser}
        showPrivacyTabs={false}
      />
    );
    await userEvent.click(screen.getByText('General'));
    expect(screen.getByText('Personal info')).toBeInTheDocument();
  });

  it('changes to Reviews card when tab is clicked', async () => {
    render(
      <TabPanel
        user={mockUser}
        showPrivacyTabs={false}
      />
    );
    await userEvent.click(screen.getByText('Reviews'));
    expect(screen.getByText('this is reviews card')).toBeInTheDocument();
  });
});
