
jest.mock('../../components/Title', () => () => null);
jest.mock('../../components/Navbar', () => () => null);

import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import WordOftheDay from "../WordOfTheDay";
import AsyncStorage from "@react-native-async-storage/async-storage";


const todayPST = () => {
    const now = new Date();
    const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    return pst.toISOString().split('T')[0];
  };
  
  const setStored = (date: string | null, word: string | null) => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      if (key === 'wordOfTheDayDate') return Promise.resolve(date);
      if (key === 'wordOfTheDay') return Promise.resolve(word);
      return Promise.resolve(null);
    });
  };
  
  describe('WordOfTheDay', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (globalThis.fetch as jest.Mock).mockReset(); 
    });
  
    it('renders stored word and its definition', async () => {
      setStored(todayPST(), 'apple');
  
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { meanings: [{ definitions: [{ definition: 'a test definition' }] }] },
        ],
      } as any);
  
      render(<WordOftheDay />);
      expect(await screen.findByText(/apple/i)).toBeTruthy();
  
      await waitFor(() => {
        expect(screen.getByText(/a test definition/i)).toBeTruthy();
      });
    });
  
    it('fetches a random word if none stored, then shows its details', async () => {
      setStored(null, null);
  
      (globalThis.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ['rainbow'], // random word
        } as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [
            { meanings: [{ definitions: [{ definition: 'color spectrum arc' }] }] },
          ],
        } as any);
  
      render(<WordOftheDay />);
      expect(await screen.findByText(/rainbow/i)).toBeTruthy();
  
      await waitFor(() => {
        expect(screen.getByText(/color spectrum arc/i)).toBeTruthy();
      });
  
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('wordOfTheDay', 'rainbow');
    });
  
    it('handles dictionary API failure without crashing', async () => {
      setStored(todayPST(), 'foo');
  
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({ ok: false } as any);
  
      render(<WordOftheDay />);
      expect(await screen.findByText(/foo/i)).toBeTruthy();
    });
  });