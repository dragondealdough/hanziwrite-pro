import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child } from 'firebase/database';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Normalize username for consistent lookups (lowercase, trimmed)
const normalizeUsername = (name: string): string => {
    return name.toLowerCase().trim().replace(/\s+/g, '-');
};

// Simple hash for PIN (not cryptographically secure, but good enough for a classroom app)
const hashPin = (pin: string): string => {
    let hash = 0;
    for (let i = 0; i < pin.length; i++) {
        const char = pin.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
};

export interface AuthResult {
    success: boolean;
    isNewUser: boolean;
    displayName: string;
    error?: string;
}

export interface UserData {
    displayName: string;
    pinHash: string;
    createdAt: number;
}

/**
 * Register a new user or log in an existing user.
 * - If username doesn't exist: creates new account
 * - If username exists and PIN matches: login success
 * - If username exists and PIN doesn't match: login failure
 */
export async function registerOrLogin(name: string, pin: string): Promise<AuthResult> {
    const normalizedName = normalizeUsername(name);
    const pinHash = hashPin(pin);

    try {
        const userRef = ref(db, `users/${normalizedName}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            // User exists - check PIN
            const userData = snapshot.val() as UserData;
            if (userData.pinHash === pinHash) {
                return {
                    success: true,
                    isNewUser: false,
                    displayName: userData.displayName
                };
            } else {
                return {
                    success: false,
                    isNewUser: false,
                    displayName: '',
                    error: `The name "${name}" is already taken. Wrong PIN!`
                };
            }
        } else {
            // New user - create account
            const newUser: UserData = {
                displayName: name.trim(),
                pinHash: pinHash,
                createdAt: Date.now()
            };
            await set(userRef, newUser);
            return {
                success: true,
                isNewUser: true,
                displayName: name.trim()
            };
        }
    } catch (error) {
        console.error('Auth error:', error);
        return {
            success: false,
            isNewUser: false,
            displayName: '',
            error: 'Connection error. Please try again.'
        };
    }
}

/**
 * Save user's quiz progress to the cloud
 */
export async function saveUserProgress(
    username: string,
    results: Record<string, number>
): Promise<void> {
    const normalizedName = normalizeUsername(username);
    try {
        await set(ref(db, `progress/${normalizedName}`), {
            results,
            updatedAt: Date.now()
        });
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

/**
 * Load user's quiz progress from the cloud
 */
export async function getUserProgress(
    username: string
): Promise<Record<string, number>> {
    const normalizedName = normalizeUsername(username);
    try {
        const snapshot = await get(ref(db, `progress/${normalizedName}/results`));
        if (snapshot.exists()) {
            return snapshot.val();
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
    }
    return {};
}

/**
 * Save custom packs to the cloud (shared across all users)
 */
export async function saveSharedPacks(packs: any[]): Promise<void> {
    try {
        await set(ref(db, 'sharedPacks'), packs);
    } catch (error) {
        console.error('Failed to save packs:', error);
    }
}

/**
 * Load shared packs from the cloud
 */
export async function getSharedPacks(): Promise<any[]> {
    try {
        const snapshot = await get(ref(db, 'sharedPacks'));
        if (snapshot.exists()) {
            return snapshot.val();
        }
    } catch (error) {
        console.error('Failed to load packs:', error);
    }
    return [];
}
