import bpy, sys, glob, os
S=sys.argv[1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.fbx(filepath=S+'/char/skinned.fbx')
rig=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]; rig.name='Rig'
m=[o for o in bpy.data.objects if o.type=='MESH'][0]
bpy.data.actions[0].name='Idle'; bpy.data.actions[0].use_fake_user=True
sc=bpy.context.scene
for f in sorted(glob.glob(S+'/anim/*.fbx')):
    n=os.path.basename(f)[:-4]
    if n=='Idle': continue
    before=set(bpy.data.objects); acts_before=set(bpy.data.actions)
    bpy.ops.import_scene.fbx(filepath=f)
    src=[o for o in set(bpy.data.objects)-before if o.type=='ARMATURE'][0]
    sa=src.animation_data.action; fr=[int(x) for x in sa.frame_range]
    rig.animation_data.action=None
    for pb in rig.pose.bones:
        if pb.name not in src.pose.bones: continue
        c=pb.constraints.new('COPY_ROTATION'); c.target=src; c.subtarget=pb.name; c.target_space='WORLD'; c.owner_space='WORLD'
        if pb.name.endswith('Hips'):
            c2=pb.constraints.new('COPY_LOCATION'); c2.target=src; c2.subtarget=pb.name; c2.target_space='WORLD'; c2.owner_space='WORLD'
    bpy.ops.object.select_all(action='DESELECT'); rig.select_set(True); bpy.context.view_layer.objects.active=rig
    bpy.ops.object.mode_set(mode='POSE'); bpy.ops.pose.select_all(action='SELECT')
    bpy.ops.nla.bake(frame_start=fr[0], frame_end=fr[1], only_selected=False, visual_keying=True, clear_constraints=True, use_current_action=False, bake_types={'POSE'})
    bpy.ops.object.mode_set(mode='OBJECT')
    na=rig.animation_data.action; na.name=n; na.use_fake_user=True
    for a in set(bpy.data.actions)-acts_before-{na}: bpy.data.actions.remove(a)
    for o in set(bpy.data.objects)-before: bpy.data.objects.remove(o, do_unlink=True)
    print('baked', n, fr)
rig.animation_data.action=None
bpy.ops.object.select_all(action='DESELECT'); m.select_set(True); bpy.context.view_layer.objects.active=m
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.normals_make_consistent(inside=False); bpy.ops.object.mode_set(mode='OBJECT')
print('actions', sorted(a.name for a in bpy.data.actions))
bpy.ops.wm.save_as_mainfile(filepath=S+'/char/rigged.blend')
