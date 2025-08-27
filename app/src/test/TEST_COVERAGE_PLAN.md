# Test Coverage Plan for Bloom Desktop Pilot

## Current Coverage Status (68.83%)

### ✅ Already Well Tested (100% coverage):
- `lib/prisma.ts` - 100%
- `main/local-storage.ts` - 100%
- `main/util.ts` - 100%
- `renderer/FieldInfo.tsx` - 100%
- `renderer/PlantQrCodeTextBox.tsx` - 100%
- `renderer/util.ts` - 100%

### ⚠️ Partially Tested (Need improvement):
- `main/prismastore.ts` - 62.14% coverage (187 lines uncovered)
- `main/scanner.ts` - 61.37% coverage (129 lines uncovered)

### ❌ Not Tested At All (0% coverage):
Based on file listing, these files have no test coverage:

#### Main Process Files:
1. `main/main.ts` - Application entry point
2. `main/preload.ts` - IPC bridge
3. `main/electricstore.ts` - Electric/Supabase operations
4. `main/bloom.ts` - Bloom API integration
5. `main/imageuploader.ts` - Image upload functionality
6. `main/scanstore.ts` - Scan data management
7. `main/streamer.ts` - Camera streaming
8. `main/menu.ts` - Application menu

#### Renderer Process Files:
1. `renderer/App.tsx` - Main app component
2. `renderer/Layout.tsx` - Layout wrapper
3. `renderer/index.tsx` - Renderer entry point
4. `renderer/CaptureScan.tsx` - Main scanning interface
5. `renderer/BrowseScans.tsx` - Scan browsing interface
6. `renderer/ViewScan.tsx` - Individual scan viewer
7. `renderer/ScanPreview.tsx` - Scan preview component
8. `renderer/Experiments.tsx` - Experiments management
9. `renderer/ExperimentChooser.tsx` - Experiment selector
10. `renderer/Accessions.tsx` - Accessions management
11. `renderer/AccessionChooser.tsx` - Accession selector
12. `renderer/PersonChooser.tsx` - Person selector
13. `renderer/Phenotypers.tsx` - Phenotyper management
14. `renderer/Scientists.tsx` - Scientist management
15. `renderer/CameraSettings.tsx` - Camera configuration
16. `renderer/Streamer.tsx` - Live camera stream
17. `renderer/Export.tsx` - Data export functionality
18. `renderer/ElectricStatusBadge.tsx` - Status indicator

## Testing Strategy to Reach 100% Coverage

### Phase 1: Improve Existing Test Coverage (Target: 85%)

#### 1.1 Complete prismastore.ts coverage
**Priority: HIGH**
- Add tests for uncovered lines 62-100 (Scientist operations)
- Add tests for lines 121-168 (Accession operations)
- Add tests for lines 239-285 (Experiment operations)
- Add tests for lines 316-335 (Scan filtering operations)
- Add tests for lines 343-379 (Scan date operations)
- Add tests for lines 381-485 (Image upload operations)
- Add tests for lines 487-494 (getImagesToUpload)

**Test File:** `src/main/prismastore.test.ts` (expand existing)

#### 1.2 Complete scanner.ts coverage
**Priority: HIGH**
- Add tests for lines 88-94 (Scan data persistence)
- Add tests for lines 134-152 (Image capture simulation)
- Add tests for lines 207-232 (Scan saving logic)
- Add tests for lines 277-292 (Current scan deletion)
- Add tests for lines 306-311 (Error handling)

**Test File:** `src/main/scanner.test.ts` (expand existing)

### Phase 2: Test Critical Main Process Files (Target: 92%)

#### 2.1 main.ts
**Priority: CRITICAL**
- Mock electron app lifecycle
- Test IPC handler registration
- Test window creation
- Test store initialization
- Test error handling

**New Test File:** `src/main/main.test.ts`

#### 2.2 preload.ts
**Priority: CRITICAL**
- Test contextBridge API exposure
- Test IPC communication methods
- Mock electron APIs

**New Test File:** `src/main/preload.test.ts`

#### 2.3 imageuploader.ts
**Priority: HIGH**
- Test image upload queue
- Test retry logic
- Test Supabase integration (mocked)
- Test error handling

**New Test File:** `src/main/imageuploader.test.ts`

#### 2.4 electricstore.ts
**Priority: HIGH**
- Test Electric/Supabase sync
- Test offline capabilities
- Test data synchronization

**New Test File:** `src/main/electricstore.test.ts`

### Phase 3: Test React Components (Target: 96%)

#### 3.1 Core Components
**Priority: HIGH**
- `App.tsx` - Test routing, state management
- `Layout.tsx` - Test layout rendering
- `CaptureScan.tsx` - Test scanning workflow

**New Test Files:**
- `src/renderer/App.test.tsx`
- `src/renderer/Layout.test.tsx`
- `src/renderer/CaptureScan.test.tsx`

#### 3.2 Data Management Components
**Priority: MEDIUM**
- `BrowseScans.tsx` - Test scan listing
- `ViewScan.tsx` - Test scan display
- `Experiments.tsx` - Test experiment CRUD
- `Accessions.tsx` - Test accession management

**New Test Files:**
- `src/renderer/BrowseScans.test.tsx`
- `src/renderer/ViewScan.test.tsx`
- `src/renderer/Experiments.test.tsx`
- `src/renderer/Accessions.test.tsx`

#### 3.3 UI Components
**Priority: LOW**
- All chooser components
- Status badges
- Settings components

### Phase 4: Integration & E2E Testing (Target: 100%)

#### 4.1 Integration Tests
- Test main-renderer communication
- Test database operations end-to-end
- Test file system operations

#### 4.2 E2E Tests (using Playwright/Spectron)
- Complete scan workflow
- Data export workflow
- Settings management

## Implementation Order

### Week 1 (Days 1-3): Foundation
1. **Day 1**: Complete `prismastore.test.ts` - Add remaining 13 test cases
2. **Day 2**: Complete `scanner.test.ts` - Add remaining 11 test cases  
3. **Day 3**: Create `main.test.ts` and `preload.test.ts`

### Week 1 (Days 4-5): Critical Coverage
4. **Day 4**: Create `imageuploader.test.ts` and `electricstore.test.ts`
5. **Day 5**: Create component tests for `App.tsx`, `Layout.tsx`, `CaptureScan.tsx`

### Week 2 (Days 6-8): Component Testing
6. **Day 6**: Test data management components (Browse, View, Experiments)
7. **Day 7**: Test remaining UI components
8. **Day 8**: Integration testing setup and implementation

### Week 2 (Days 9-10): Finalization
9. **Day 9**: Fix any failing tests, improve test quality
10. **Day 10**: E2E test setup, documentation, and final coverage check

## Test Implementation Guidelines

### 1. Mocking Strategy
```typescript
// Mock Electron APIs
vi.mock('electron', () => ({
  app: { /* mocked methods */ },
  ipcMain: { /* mocked methods */ },
  BrowserWindow: vi.fn()
}));

// Mock Prisma Client
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrismaClient)
}));

// Mock file system
vi.mock('fs', () => ({
  /* mocked fs methods */
}));
```

### 2. Test Structure Template
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
    vi.clearAllMocks();
  });

  describe('Feature Group', () => {
    it('should handle specific case', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### 3. Coverage Goals Per File Type
- **Business Logic**: 100% statement, branch, and function coverage
- **React Components**: 95% statement coverage, 90% branch coverage
- **Utility Functions**: 100% coverage
- **Main Process**: 90% statement coverage (some Electron APIs hard to test)

## Success Metrics
- Overall coverage: 100%
- All critical paths tested
- No untested error handlers
- All edge cases covered
- Integration tests passing
- E2E tests for main workflows

## Tools & Commands

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### View Coverage Report
```bash
# HTML report generated at:
open coverage/index.html
```

### Run Specific Test File
```bash
npx vitest src/main/prismastore.test.ts
```

## Notes
- Focus on testing business logic first, UI second
- Mock external dependencies (Electron, Supabase, file system)
- Use React Testing Library for component tests
- Consider using MSW for API mocking
- Ensure tests are maintainable and readable
- Add tests for bug fixes to prevent regression