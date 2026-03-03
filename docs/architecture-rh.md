 BattleScreen Component
 
  ARCHITECTURE IMPLEMENTATION (I.3 Requirement):
 
 This component demonstrates the complete hook-service-repository architecture:

 1. HOOK (useBattleLog): 
    - Manages presentation logic for battle log messages
    - Provides state (messages, error) and actions (handleAttack, handleSkill, etc.)
    - Reusable across any component that needs battle log functionality

 2. SERVICE (battleLogService):
    - Contains business logic for battle actions
    - Determines damage values, message formatting, action sequences
    - Example: processAttackAction() knows that attacks should show ally message + enemy damage response
 
 3. REPOSITORY (battleLogRepository):
    - Handles all data access (CRUD operations)
    - Currently uses test data, will connect to backend API in next sprint
    - Provides abstraction layer so business logic doesn't care about data source

FLOW EXAMPLE (Attack button clicked):
BattleScreen → useBattleLog.handleAttack() → 
battleLogService.processAttackAction() → 
battleLogRepository.createMessage() → 
Update state → Re-render with new messages

This separation of concerns makes the code:
- Easier to test (each layer can be tested independently)
- Easier to maintain (changes to data source don't affect business logic)
- More reusable (hook can be used in other components like a battle replay viewer)
