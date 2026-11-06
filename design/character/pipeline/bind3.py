import bpy, sys, glob, os
S=sys.argv[1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=S+'/char/skinned.fbx')
arm=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]; arm.name='Rig'
ms=[o for o in bpy.data.objects if o.type=='MESH']
print('meshes',[(m.name,len(m.data.vertices),sum(1 for v in m.data.vertices if v.groups), [md.type for md in m.modifiers]) for m in ms])
print('images',[(i.name,i.size[:]) for i in bpy.data.images])
bpy.data.actions[0].name='Idle'
for f in sorted(glob.glob(S+'/anim/*.fbx')):
    n=os.path.basename(f)[:-4]
    if n=='Idle': continue
    before=set(bpy.data.objects); bpy.ops.import_scene.fbx(filepath=f)
    for o in set(bpy.data.objects)-before:
        if o.type=='ARMATURE' and o.animation_data and o.animation_data.action: o.animation_data.action.name=n
        bpy.data.objects.remove(o, do_unlink=True)
for a in bpy.data.actions: a.use_fake_user=True
print('actions',[a.name for a in bpy.data.actions])
bpy.ops.wm.save_as_mainfile(filepath=S+'/char/rigged.blend')
